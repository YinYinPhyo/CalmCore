from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(
    prefix="/sounds",
    tags=["sounds"],
    responses={404: {"description": "Not found"}},
)
templates = Jinja2Templates(directory="app/templates")

@router.get("/", response_model=List[schemas.Sound])
def read_sounds(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    sounds = crud.get_sounds(db, skip=skip, limit=limit)
    return sounds

# Web route to render sound page
@router.get("/page", response_class=HTMLResponse)
async def sounds_page(request: Request, db: Session = Depends(get_db)):
    sounds = crud.get_sounds(db, skip=0, limit=10)  # Fetching sounds for display
    return templates.TemplateResponse("sounds.html", {"request": request, "sounds": sounds})

@router.post("/", response_model=schemas.Sound)
def create_sound(sound: schemas.SoundCreate, db: Session = Depends(get_db)):
    return crud.create_sound(db=db, sound=sound)

@router.get("/{sound_id}", response_model=schemas.Sound)
def read_sound(sound_id: int, db: Session = Depends(get_db)):
    db_sound = crud.get_sound(db, sound_id=sound_id)
    if db_sound is None:
        raise HTTPException(status_code=404, detail="Sound not found")
    return db_sound

@router.put("/{sound_id}", response_model=schemas.Sound)
def update_sound(sound_id: int, sound: schemas.SoundUpdate, db: Session = Depends(get_db)):
    # db_sound = crud.update_sound(db, sound_id=sound_id, sound=sound)
    # if db_sound is None:
    #     raise HTTPException(status_code=404, detail="Sound not found")
    # return db_sound
    db_sound = crud.get_sound(db, sound_id)
    if not db_sound:
        raise HTTPException(status_code=404, detail="Sound not found")
    return crud.update_sound(db, sound_id, sound)

@router.delete("/{sound_id}", response_model=schemas.Sound)
def delete_sound(sound_id: int, db: Session = Depends(get_db)):
    db_sound = crud.delete_sound(db, sound_id=sound_id)
    if db_sound is None:
        raise HTTPException(status_code=404, detail="Sound not found")
    return db_sound
