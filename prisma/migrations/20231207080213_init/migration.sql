-- CreateTable
CREATE TABLE "Singer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stageName" TEXT
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "length" INTEGER,
    "singer_id" TEXT NOT NULL,
    CONSTRAINT "Song_singer_id_fkey" FOREIGN KEY ("singer_id") REFERENCES "Singer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_slug_key" ON "Song"("slug");
