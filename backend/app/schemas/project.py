from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    title: str
    slug: str
    short_description: str
    description: str | None = None
    technologies: str | None = None
    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    published: bool = False
    display_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    short_description: str | None = None
    description: str | None = None
    technologies: str | None = None
    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    published: bool | None = None
    display_order: int | None = None


class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)