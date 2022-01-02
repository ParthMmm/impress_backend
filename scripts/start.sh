#!/bin/sh

npm i @prisma/client

echo "i clients"
npm run prisma:migrate
npm run prisma:generate

echo "i generated"
npm run dev