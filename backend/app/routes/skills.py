from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.skill import Skill
from app.schemas.skill import (
    SkillCreate,
    SkillResponse,
    SkillUpdate,
)


router = APIRouter(
    prefix="/api/skills",
    tags=["Skills"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# GET ALL SKILLS
# ---------------------------------------------------------

@router.get("", response_model=list[SkillResponse])
def get_skills(
    db: Session = Depends(get_db),
):
    result = db.execute(
        select(Skill).order_by(
            Skill.display_order,
            Skill.id,
        )
    )

    return result.scalars().all()


# ---------------------------------------------------------
# GET SINGLE SKILL
# ---------------------------------------------------------

@router.get("/{skill_id}", response_model=SkillResponse)
def get_single_skill(
    skill_id: int,
    db: Session = Depends(get_db),
):
    skill = db.get(Skill, skill_id)

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found.",
        )

    return skill


# ---------------------------------------------------------
# CREATE SKILL
# ---------------------------------------------------------

@router.post(
    "",
    response_model=SkillResponse,
    status_code=201,
)
def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db),
):
    new_skill = Skill(
        **skill.model_dump()
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


# ---------------------------------------------------------
# UPDATE SKILL
# ---------------------------------------------------------

@router.put(
    "/{skill_id}",
    response_model=SkillResponse,
)
def update_skill(
    skill_id: int,
    skill: SkillUpdate,
    db: Session = Depends(get_db),
):
    existing_skill = db.get(
        Skill,
        skill_id,
    )

    if not existing_skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found.",
        )

    update_data = skill.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            existing_skill,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_skill)

    return existing_skill


# ---------------------------------------------------------
# DELETE SKILL
# ---------------------------------------------------------

@router.delete(
    "/{skill_id}",
    status_code=204,
)
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
):
    existing_skill = db.get(
        Skill,
        skill_id,
    )

    if not existing_skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found.",
        )

    db.delete(existing_skill)
    db.commit()

    return None