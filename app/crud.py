from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas

## Meditation
def get_meditations(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Meditation).offset(skip).limit(limit).all()

def create_meditation(db: Session, meditation: schemas.MeditationCreate):
    db_meditation = models.Meditation(**meditation.dict())
    db.add(db_meditation)
    db.commit()
    db.refresh(db_meditation)
    return db_meditation

def get_meditation(db: Session, meditation_id: int):
    return db.query(models.Meditation).filter(models.Meditation.id == meditation_id).first()

def update_meditation(db: Session, meditation_id: int, meditation: schemas.MeditationCreate):
    db_meditation = db.query(models.Meditation).filter(models.Meditation.id == meditation_id).first()
    if db_meditation:
        db_meditation.title = meditation.title # type: ignore
        db_meditation.description = meditation.description # type: ignore
        db_meditation.video_url = meditation.video_url # type: ignore
        db_meditation.thumbnail_url = meditation.thumbnail_url # type: ignore
        db.commit()
        db.refresh(db_meditation)
    return db_meditation

def delete_meditation(db: Session, meditation_id: int):
    db_meditation = db.query(models.Meditation).filter(models.Meditation.id == meditation_id).first()
    if db_meditation:
        db.delete(db_meditation)
        db.commit()
    return db_meditation

## Article
def get_articles(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Article).offset(skip).limit(limit).all()

def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id == article_id).first()

def update_article(db: Session, article_id: int, article: schemas.ArticleCreate):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article:
        db_article.title = article.title # type: ignore
        db_article.author = article.author # type: ignore
        db_article.content = article.content # type: ignore
        db_article.thumbnail_url = article.thumbnail_url # type: ignore
        db_article.published_date = article.published_date # type: ignore
        db.commit()
        db.refresh(db_article)
    return db_article

def delete_article(db: Session, article_id: int):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article:
        db.delete(db_article)
        db.commit()
    return db_article

## Sound Category
def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def update_category (db: Session, category_id: int, category: schemas.CategoryCreate):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if db_category:
        db_category.category_name = category.category_name # type: ignore
       
        db.commit()
        db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if db_category:
        db.delete(db_category)
        db.commit()
    return db_category

# ## Sound
def get_sounds(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Sound).offset(skip).limit(limit).all()

# def create_sound(db: Session, sound: schemas.SoundCreate):
#     db_sound = models.Sound(**sound.dict())
#     db.add(db_sound)
#     db.commit()
#     db.refresh(db_sound)
#     return db_sound

def create_sound(db: Session, sound: schemas.SoundCreate):
    db_category = db.query(models.Category).filter(models.Category.id == sound.category_id).first() # type: ignore
    if not db_category:
        raise HTTPException(status_code=400, detail="Category not found")
    db_sound = models.Sound(**sound.dict())
    db.add(db_sound)
    db.commit()
    db.refresh(db_sound)
    return db_sound


def get_sound(db: Session, sound_id: int):
    return db.query(models.Sound).filter(models.Sound.id == sound_id).first()

def update_sound (db: Session, sound_id: int, sound: schemas.SoundUpdate):
    db_category = db.query(models.Category).filter(models.Category.id == sound.category_id).first()
    if not db_category:
        raise HTTPException(status_code=400, detail="Category not found")
    db_sound = db.query(models.Sound).filter(models.Sound.id == sound_id).first()
    if db_sound:
        db_sound.title = sound.title # type: ignore
        db_sound.duration = sound.duration # type: ignore
        db_sound.audio_url = sound.audio_url # type: ignore
        db_sound.thumbnail_url = sound.thumbnail_url # type: ignore
        db_sound.category_id = sound.category_id # type: ignore
        db.commit()
        db.refresh(db_sound)
    return db_sound

# def update_sound(db: Session, sound_id: int, sound: schemas.SoundCreate):
#     db_category = db.query(schemas.Category).filter(models.Category.id == sound.category_id).first()
#     if not db_category:
#         raise HTTPException(status_code=400, detail="Category not found")
#     db_sound = db.query(schemas.Sound).filter(models.Sound.id == sound_id).first()
#     if db_sound:
#         db_sound.title = sound.title
#         db_sound.duration = sound.duration
#         db_sound.audio_url = sound.audio_url
#         db_sound.thumbnail_url = sound.thumbnail_url
#         db_sound.category_id = sound.category_id
#         db.commit()
#         db.refresh(db_sound)
#         return db_sound
#     return None

def delete_sound(db: Session, sound_id: int):
    db_sound = db.query(models.Sound).filter(models.Sound.id == sound_id).first()
    if db_sound:
        db.delete(db_sound)
        db.commit()
    return db_sound