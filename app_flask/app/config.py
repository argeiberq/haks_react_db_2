import os
class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345678@database-1.cv2ukouw4nsl.us-east-2.rds.amazonaws.com/userdb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False