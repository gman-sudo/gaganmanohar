from app.database import Base, engine
from app.models import (
    SiteSettings,
    Project,
    Experience,
    Education,
    Skill,
)


def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")


if __name__ == "__main__":
    init_db()