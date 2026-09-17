from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routes.projects import router as projects_router
from app.routes.site import router as site_router
from app.routes.experience import router as experience_router
from app.routes.education import router as education_router
from app.routes.skills import router as skills_router
from app.routes.upload import router as upload_router
from app.routes.auth import router as auth_router

app = FastAPI(
    title="Gaganmanohar Portfolio API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router)
app.include_router(site_router)
app.include_router(experience_router)
app.include_router(education_router)
app.include_router(skills_router)
app.include_router(upload_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Gaganmanohar Portfolio API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }