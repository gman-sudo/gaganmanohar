from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.site import SiteSettings
from app.schemas.site import (
    SiteSettingsResponse,
    SiteSettingsUpdate,
)


router = APIRouter(
    prefix="/api/site",
    tags=["Site"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=SiteSettingsResponse)
def get_site_settings(db: Session = Depends(get_db)):
    settings = db.execute(
        select(SiteSettings)
        .order_by(SiteSettings.id)
    ).scalars().first()

    if not settings:
        return None

    return settings


@router.put("", response_model=SiteSettingsResponse)
def update_site_settings(
    settings: SiteSettingsUpdate,
    db: Session = Depends(get_db),
):
    existing_settings = db.execute(
        select(SiteSettings)
        .order_by(SiteSettings.id)
    ).scalars().first()

    if not existing_settings:
        existing_settings = SiteSettings(
            name=settings.name or "Gaganmanohar",
            hero_title=settings.hero_title or "DATA SCIENCE & AI.",
            hero_description=settings.hero_description or "",
            location=settings.location or "Dubai, UAE",
            years_experience=settings.years_experience or 0,
            profile_image_url=settings.profile_image_url,
            github_url=settings.github_url,
            linkedin_url=settings.linkedin_url,
            resume_url=settings.resume_url,
        )

        db.add(existing_settings)

    else:
        update_data = settings.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(existing_settings, field, value)

    db.commit()
    db.refresh(existing_settings)

    return existing_settings