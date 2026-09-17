from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.experience import Experience
from app.schemas.experience import (
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate,
)


router = APIRouter(
    prefix="/api/experience",
    tags=["Experience"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# GET ALL EXPERIENCE
# ---------------------------------------------------------

@router.get(
    "",
    response_model=list[ExperienceResponse],
)
def get_experience(
    db: Session = Depends(get_db),
):
    result = db.execute(
        select(Experience)
        .order_by(
            Experience.display_order,
            Experience.id,
        )
    )

    return result.scalars().all()


# ---------------------------------------------------------
# GET SINGLE EXPERIENCE
# ---------------------------------------------------------

@router.get(
    "/{experience_id}",
    response_model=ExperienceResponse,
)
def get_single_experience(
    experience_id: int,
    db: Session = Depends(get_db),
):
    experience = db.get(
        Experience,
        experience_id,
    )

    if not experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found.",
        )

    return experience


# ---------------------------------------------------------
# CREATE EXPERIENCE
# ---------------------------------------------------------

@router.post(
    "",
    response_model=ExperienceResponse,
    status_code=201,
)
def create_experience(
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
):
    new_experience = Experience(
        **experience.model_dump()
    )

    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)

    return new_experience


# ---------------------------------------------------------
# UPDATE EXPERIENCE
# ---------------------------------------------------------

@router.put(
    "/{experience_id}",
    response_model=ExperienceResponse,
)
def update_experience(
    experience_id: int,
    experience: ExperienceUpdate,
    db: Session = Depends(get_db),
):
    existing_experience = db.get(
        Experience,
        experience_id,
    )

    if not existing_experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found.",
        )

    update_data = experience.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            existing_experience,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_experience)

    return existing_experience


# ---------------------------------------------------------
# DELETE EXPERIENCE
# ---------------------------------------------------------

@router.delete(
    "/{experience_id}",
    status_code=204,
)
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db),
):
    existing_experience = db.get(
        Experience,
        experience_id,
    )

    if not existing_experience:
        raise HTTPException(
            status_code=404,
            detail="Experience not found.",
        )

    db.delete(existing_experience)
    db.commit()

    return None