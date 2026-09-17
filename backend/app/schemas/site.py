from pydantic import BaseModel, ConfigDict


class SiteSettingsBase(BaseModel):
    name: str
    hero_title: str
    hero_description: str
    location: str
    years_experience: int = 0
    profile_image_url: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None
    resume_url: str | None = None


class SiteSettingsUpdate(BaseModel):
    name: str | None = None
    hero_title: str | None = None
    hero_description: str | None = None
    location: str | None = None
    years_experience: int | None = None
    profile_image_url: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None
    resume_url: str | None = None


class SiteSettingsResponse(SiteSettingsBase):
    id: int

    model_config = ConfigDict(from_attributes=True)