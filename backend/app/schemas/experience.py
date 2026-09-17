from datetime import date

from pydantic import BaseModel, ConfigDict


class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: date
    end_date: date | None = None
    description: str
    display_order: int = 0


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(BaseModel):
    company: str | None = None
    role: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    description: str | None = None
    display_order: int | None = None


class ExperienceResponse(ExperienceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)