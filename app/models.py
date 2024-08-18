from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship, Session
from .database import Base
from datetime import datetime

## Meditation
class Meditation(Base):
    __tablename__ = "meditations"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    video_url = Column(String)
    thumbnail_url = Column(String)

## Article
class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    content = Column(Text)
    thumbnail_url = Column(String)
    published_date = Column(DateTime, default=datetime.utcnow)

## Sound Category
class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String, unique=True, index=True)
    
    sounds = relationship("Sound", back_populates="category")

# ## Sound
class Sound(Base):
    __tablename__ = "sounds"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    duration = Column(Integer)  # Duration in seconds
    audio_url = Column(String)
    thumbnail_url = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    # category = relationship("SoundCategory")
    category = relationship("Category", back_populates="sounds")