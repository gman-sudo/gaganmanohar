from pydantic import BaseModel, ConfigDict


class EducationBase(BaseModel):
    institution: str
    degree: str
    start_year: int
    end_year: int | None = None
    description: str | None = None
    display_order: int = 0


class EducationCreate(EducationBase):
    pass


class EducationUpdate(BaseModel):
    institution: str | None = None
    degree: str | None = None
    start_year: int | None = None
    end_year: int | None = None
    description: str | None = None
    display_order: int | None = None


class EducationResponse(EducationBase):
    id: int

    model_config = ConfigDict(from_attributes=True)