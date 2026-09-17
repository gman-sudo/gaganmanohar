from fastapi import APIRouter, File, HTTPException, UploadFile

import cloudinary.uploader


router = APIRouter(
    prefix="/api/upload",
    tags=["Upload"],
)


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10 MB


ALLOWED_DOCUMENT_TYPES = {
    "application/pdf",
}

MAX_DOCUMENT_SIZE = 10 * 1024 * 1024  # 10 MB


# --------------------------------------------------
# IMAGE UPLOAD HELPER
# --------------------------------------------------

async def upload_cloudinary_image(
    file: UploadFile,
    folder: str,
):
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="File type could not be determined.",
        )

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WebP images are allowed.",
        )

    contents = await file.read()

    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image must be smaller than 10 MB.",
        )

    try:
        result = cloudinary.uploader.upload(
            contents,
            folder=folder,
            resource_type="image",
        )

        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "width": result.get("width"),
            "height": result.get("height"),
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Image upload failed: {exc}",
        )


# --------------------------------------------------
# PROJECT IMAGE
# --------------------------------------------------

@router.post("")
async def upload_project_image(
    file: UploadFile = File(...),
):
    return await upload_cloudinary_image(
        file,
        "gaganmanohar/projects",
    )


# --------------------------------------------------
# PROFILE IMAGE
# --------------------------------------------------

@router.post("/profile")
async def upload_profile_image(
    file: UploadFile = File(...),
):
    return await upload_cloudinary_image(
        file,
        "gaganmanohar/profile",
    )


# --------------------------------------------------
# RESUME PDF
# --------------------------------------------------

@router.post("/resume")
async def upload_resume(
    file: UploadFile = File(...),
):
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="File type could not be determined.",
        )

    if file.content_type not in ALLOWED_DOCUMENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    contents = await file.read()

    if len(contents) > MAX_DOCUMENT_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Resume must be smaller than 10 MB.",
        )

    try:
        result = cloudinary.uploader.upload(
            contents,
            folder="gaganmanohar/resume",
            resource_type="image",
            format="pdf",
        )

        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Resume upload failed: {exc}",
        )