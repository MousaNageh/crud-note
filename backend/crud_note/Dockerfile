FROM python:3.11.0-alpine

ENV SECRET_KEY='django-insecure-#*4y#vle(as7c__=qutz^ogd=-8-m9^w+tc&05no_a831_leqm'


WORKDIR /app

COPY requirements.txt /app/

RUN apk update &&  apk add postgresql-dev gcc python3-dev musl-dev \
    py3-setuptools tiff-dev jpeg-dev openjpeg-dev zlib-dev \
    freetype-dev lcms2-dev libwebp-dev tcl-dev tk-dev harfbuzz-dev \
    fribidi-dev libimagequant-dev libxcb-dev libpng-dev


RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 2286