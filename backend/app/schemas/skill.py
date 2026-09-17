from pydantic import BaseModel, ConfigDict


class SkillBase(BaseModel):
    category: str
    name: str
    display_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    category: str | None = None
    name: str | None = None
    display_order: int | None = None


class SkillResponse(SkillBase):
    id: int

    model_config = ConfigDict(from_attributes=True)