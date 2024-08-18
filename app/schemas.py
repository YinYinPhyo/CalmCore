from datetime import datetime
import string
from pydantic import BaseModel

## Meditation
class MeditationBase(BaseModel):
    title: str
    description: str
    video_url: str
    thumbnail_url: str

class MeditationCreate(MeditationBase):
    pass

class Meditation(MeditationBase):
    id: int

    class Config:
        orm_mode = True

## Article
class ArticleBase(BaseModel):
    title: str
    author: str
    content: str
    thumbnail_url: str
    published_date: datetime

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int

    class Config:
        orm_mode = True

## Sound Category
class CategoryBase(BaseModel):
    category_name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True

## Sound
class SoundBase(BaseModel):
    title: str
    duration: int
    audio_url: str
    thumbnail_url: str
    category_id: int
    

class SoundCreate(SoundBase):
    pass


class SoundUpdate(SoundBase):
    pass

class Sound(SoundBase):
    id: int
    category: Category

    class Config:
        orm_mode = True