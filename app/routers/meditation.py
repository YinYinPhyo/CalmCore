from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(
    prefix="/meditations",
    tags=["meditations"],
    responses={404: {"description": "Not found"}},
)
templates = Jinja2Templates(directory="app/templates")

@router.get("/", response_model=List[schemas.Meditation])
def read_meditations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    meditations = crud.get_meditations(db, skip=skip, limit=limit)
    return meditations

# Web route to render meditation page
@router.get("/page", response_class=HTMLResponse)
async def meditations_page(request: Request, db: Session = Depends(get_db)):
    meditations = crud.get_meditations(db, skip=0, limit=10)  # Fetching meditations for display
    return templates.TemplateResponse("meditations.html", {"request": request, "meditations": meditations})

@router.post("/", response_model=schemas.Meditation)
def create_meditation(meditation: schemas.MeditationCreate, db: Session = Depends(get_db)):
    return crud.create_meditation(db=db, meditation=meditation)

@router.get("/{meditation_id}", response_model=schemas.Meditation)
def read_meditation(meditation_id: int, db: Session = Depends(get_db)):
    db_meditation = crud.get_meditation(db, meditation_id=meditation_id)
    if db_meditation is None:
        raise HTTPException(status_code=404, detail="Meditation not found")
    return db_meditation

# Web route to render meditation detail page
@router.get("/{meditation_id}/page", response_class=HTMLResponse)
async def get_meditation(meditation_id: int, request: Request, db: Session = Depends(get_db)):
    meditation = crud.get_meditation(db, meditation_id)  # Fetching one meditation for display
    if meditation is None:
        raise HTTPException(status_code=404, detail="Article not found")
    # Render the article detail HTML template
    return templates.TemplateResponse("meditation_detail.html", {
        "request": request,
        "meditation": meditation
    })

@router.put("/{meditation_id}", response_model=schemas.Meditation)
def update_meditation(meditation_id: int, meditation: schemas.MeditationCreate, db: Session = Depends(get_db)):
    db_meditation = crud.update_meditation(db, meditation_id=meditation_id, meditation=meditation)
    if db_meditation is None:
        raise HTTPException(status_code=404, detail="Meditation not found")
    return db_meditation

@router.delete("/{meditation_id}", response_model=schemas.Meditation)
def delete_meditation(meditation_id: int, db: Session = Depends(get_db)):
    db_meditation = crud.delete_meditation(db, meditation_id=meditation_id)
    if db_meditation is None:
        raise HTTPException(status_code=404, detail="Meditation not found")
    return db_meditation
