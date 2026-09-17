from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.education import Education
from app.schemas.education import (
    EducationCreate,
    EducationResponse,
    EducationUpdate,
)


router = APIRouter(
    prefix="/api/education",
    tags=["Education"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# GET ALL EDUCATION
# ---------------------------------------------------------

@router.get(
    "",
    response_model=list[EducationResponse],
)
def get_education(
    db: Session = Depends(get_db),
):
    result = db.execute(
        select(Education).order_by(
            Education.display_order,
            Education.id,
        )
    )

    return result.scalars().all()


# ---------------------------------------------------------
# GET SINGLE EDUCATION
# ---------------------------------------------------------

@router.get(
    "/{education_id}",
    response_model=EducationResponse,
)
def get_single_education(
    education_id: int,
    db: Session = Depends(get_db),
):
    education = db.get(
        Education,
        education_id,
    )

    if not education:
        raise HTTPException(
            status_code=404,
            detail="Education not found.",
        )

    return education


# ---------------------------------------------------------
# CREATE EDUCATION
# ---------------------------------------------------------

@router.post(
    "",
    response_model=EducationResponse,
    status_code=201,
)
def create_education(
    education: EducationCreate,
    db: Session = Depends(get_db),
):
    new_education = Education(
        **education.model_dump()
    )

    db.add(new_education)
    db.commit()
    db.refresh(new_education)

    return new_education


# ---------------------------------------------------------
# UPDATE EDUCATION
# ---------------------------------------------------------

@router.put(
    "/{education_id}",
    response_model=EducationResponse,
)
def update_education(
    education_id: int,
    education: EducationUpdate,
    db: Session = Depends(get_db),
):
    existing_education = db.get(
        Education,
        education_id,
    )

    if not existing_education:
        raise HTTPException(
            status_code=404,
            detail="Education not found.",
        )

    update_data = education.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            existing_education,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_education)

    return existing_education


# ---------------------------------------------------------
# DELETE EDUCATION
# ---------------------------------------------------------

@router.delete(
    "/{education_id}",
    status_code=204,
)
def delete_education(
    education_id: int,
    db: Session = Depends(get_db),
):
    existing_education = db.get(
        Education,
        education_id,
    )

    if not existing_education:
        raise HTTPException(
            status_code=404,
            detail="Education not found.",
        )

    db.delete(existing_education)
    db.commit()

    return None