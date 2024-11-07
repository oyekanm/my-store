"use server";

import { db } from "@/config/db";

export async function CreateCollection(FormData: FormData) {
  const name = FormData.get("name");
  try {
    const unique = await db.collection.findFirst({
      where: {
        name: name as string,
      },
    });

    if (unique) {
      return {
        error: `${unique.name} already exists!, try another another title`,
      };
    } else {
      const createCollection = await db.collection.create({
        data: {
          name: name as string,
        },
      });
      return { data: createCollection };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateCollection(FormData: FormData, id: string) {
  const name = FormData.get("name");
  try {
    const unique = await db.collection.findFirst({
      where: {
        name: name as string,
      },
    });

    if (unique) {
      return {
        error: `${unique.name} already exists!, try another another title`,
      };
    }
    const updatedProduct = await db.collection.update({
      where: {
        id,
      },
      data: {
        name: name as string,
      },
    });
    return { data: updatedProduct };
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteSingleCollection(id: string) {
  try {
    const avail = await db.collection.findFirst({
      where: {
        id,
      },
    });
    if (!avail) {
      return { error: `Error. Data given doesn't exists!, operation faild` };
    }

    const deletedProduct = await db.collection.delete({
      where: {
        id,
      },
    });
    return { data: deletedProduct };
  } catch (error) {
    console.log(error);
  }
}

export async function CreateCollectionType(
  FormData: FormData,
  collectionId: string
) {
  const form = {
    collectionId,
    name: FormData.get("name") as string,
  };

  try {
    // check availability of a collection
    const check = await db.collection.findFirst({
      where: {
        id: form.collectionId,
      },
    });

    const unique = await db.collectionType.findFirst({
      where: {
        name: form.name,
      },
    });

    if (!check) {
      return {
        error: `The collection is not found`,
      };
    } else {
      if (unique) {
        return {
          error: `${unique.name} already exists!, try another another title`,
        };
      } else {
        const newCollectionType = await db.collectionType.create({
          data: form as any,
        });

        return { data: newCollectionType };
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateCollectionType(
  FormData: FormData,
  collectionId: string,
  id: string
) {
  const form = {
    collectionId,
    name: FormData.get("name") as string,
  };

  try {
    // check availability of a collection
    const check = await db.collection.findFirst({
      where: {
        id: form.collectionId,
      },
    });

    const unique = await db.collectionType.findFirst({
      where: {
        name: form.name,
      },
    });
    if (!check) {
      return {
        error: `The collection is not found`,
      };
    } else {
      if (unique) {
        return {
          error: `${unique.name} already exists!, try another another title`,
        };
      } else {
        const updatedCollectionType = await db.collectionType.update({
          where: {
            id,
          },
          data: form,
        });
        return { data: updatedCollectionType };
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteCollectionType(id: string) {
  try {
    const avail = await db.collectionType.findFirst({
      where: {
        id,
      },
    });
    if (!avail) {
      return { error: `Error. Data given doesn't exists!, operation faild` };
    }

    const deletedProduct = await db.collectionType.delete({
      where: {
        id,
      },
    });
    return { data: deletedProduct };
  } catch (error) {
    console.log(error);
  }
}
