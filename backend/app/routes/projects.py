from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# GET ALL PUBLISHED PROJECTS
# ---------------------------------------------------------

@router.get(
    "",
    response_model=list[ProjectResponse],
)
def get_projects(
    db: Session = Depends(get_db),
):
    statement = (
        select(Project)
        .where(Project.published.is_(True))
        .order_by(Project.display_order.asc(), Project.id.asc())
    )

    projects = db.scalars(statement).all()

    return projects


# ---------------------------------------------------------
# GET ALL PROJECTS FOR ADMIN
# ---------------------------------------------------------
# Security is intentionally skipped for now.
# This endpoint is used by the admin dashboard/editor.

@router.get(
    "/admin/all",
    response_model=list[ProjectResponse],
)
def get_all_projects(
    db: Session = Depends(get_db),
):
    statement = (
        select(Project)
        .order_by(Project.display_order.asc(), Project.id.asc())
    )

    projects = db.scalars(statement).all()

    return projects


# ---------------------------------------------------------
# GET SINGLE PROJECT BY SLUG
# ---------------------------------------------------------

@router.get(
    "/slug/{slug}",
    response_model=ProjectResponse,
)
def get_project_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    statement = select(Project).where(Project.slug == slug)

    project = db.scalar(statement)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found.",
        )

    return project


# ---------------------------------------------------------
# GET SINGLE PROJECT BY ID
# ---------------------------------------------------------

@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = db.get(Project, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found.",
        )

    return project


# ---------------------------------------------------------
# CREATE PROJECT
# ---------------------------------------------------------

@router.post(
    "",
    response_model=ProjectResponse,
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
):
    existing_project = db.scalar(
        select(Project).where(
            Project.slug == project_data.slug
        )
    )

    if existing_project is not None:
        raise HTTPException(
            status_code=400,
            detail="A project with this slug already exists.",
        )

    project = Project(
        title=project_data.title,
        slug=project_data.slug,
        short_description=project_data.short_description,
        description=project_data.description,
        technologies=project_data.technologies,
        github_url=project_data.github_url,
        live_url=project_data.live_url,
        image_url=project_data.image_url,
        published=project_data.published,
        display_order=project_data.display_order,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


# ---------------------------------------------------------
# UPDATE PROJECT
# ---------------------------------------------------------

@router.put(
    "/{project_id}",
    response_model=ProjectResponse,
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
):
    project = db.get(Project, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found.",
        )

    # Check slug uniqueness if slug is being changed
    if (
        project_data.slug is not None
        and project_data.slug != project.slug
    ):
        existing_project = db.scalar(
            select(Project).where(
                Project.slug == project_data.slug,
                Project.id != project_id,
            )
        )

        if existing_project is not None:
            raise HTTPException(
                status_code=400,
                detail="A project with this slug already exists.",
            )

    # Update fields
    if project_data.title is not None:
        project.title = project_data.title

    if project_data.slug is not None:
        project.slug = project_data.slug

    if project_data.short_description is not None:
        project.short_description = project_data.short_description

    if project_data.description is not None:
        project.description = project_data.description

    if project_data.technologies is not None:
        project.technologies = project_data.technologies

    if project_data.github_url is not None:
        project.github_url = project_data.github_url

    if project_data.live_url is not None:
        project.live_url = project_data.live_url

    if project_data.image_url is not None:
        project.image_url = project_data.image_url

    if project_data.published is not None:
        project.published = project_data.published

    if project_data.display_order is not None:
        project.display_order = project_data.display_order

    db.commit()
    db.refresh(project)

    return project


# ---------------------------------------------------------
# DELETE PROJECT
# ---------------------------------------------------------

@router.delete(
    "/{project_id}",
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = db.get(Project, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found.",
        )

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully.",
        "id": project_id,
    }