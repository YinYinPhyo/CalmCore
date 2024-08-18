from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import SessionLocal
from starlette.templating import _TemplateResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from ..database import get_db

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
    responses={404: {"description": "Not found"}},
)
templates = Jinja2Templates(directory="app/templates")

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


@router.get("/", response_model=List[schemas.Article])
def read_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    articles = crud.get_articles(db, skip=skip, limit=limit)
    return articles

# Web route to render articles page
@router.get("/page", response_class=HTMLResponse)
async def articles_page(request: Request, db: Session = Depends(get_db)):
    articles = crud.get_articles(db, skip=0, limit=10)  # Fetching articles for display
    
    return templates.TemplateResponse("articles.html", {"request": request, "articles": articles})

@router.post("/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)

@router.get("/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, db: Session = Depends(get_db)):
    db_article = crud.get_article(db, article_id=article_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

# Web route to render article detail page
@router.get("/{article_id}/page", response_class=HTMLResponse)
async def get_article(article_id: int, request: Request, db: Session = Depends(get_db)):
    article = crud.get_article(db, article_id)  # Fetching one article for display
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    # Render the article detail HTML template
    return templates.TemplateResponse("article_detail.html", {
        "request": request,
        "article": article
    })

# @router.get("/{article_id}/page", response_class=HTMLResponse)
# async def get_article(article_id:int, request: Request, db: Session = Depends(get_db)):
#     article = crud.get_article(db, article_id)  # Fetching one article for display
#     # Render the article detail HTML template
#     return templates.TemplateResponse("article_detail.html", {
#         "request": request,
#         "article": article,
#     })

@router.put("/{article_id}", response_model=schemas.Article)
def update_article(article_id: int, article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = crud.update_article(db, article_id=article_id, article=article)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

@router.delete("/{article_id}", response_model=schemas.Article)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    db_article = crud.delete_article(db, article_id=article_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article
