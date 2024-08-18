from fastapi import FastAPI, Request
from starlette.templating import _TemplateResponse
from fastapi.staticfiles import StaticFiles

from .routers import article, meditation, soundcategory, sound
from .database import engine
from . import models
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

# Initialize database
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Initialize Jinja2 templates
templates = Jinja2Templates(directory="app/templates")

app.include_router(meditation.router)
app.include_router(article.router)
app.include_router(soundcategory.router)
app.include_router(sound.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routes for each page
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


