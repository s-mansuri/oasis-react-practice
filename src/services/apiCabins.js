import supabase, { supabaseUrl } from "./supabse";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // This is for create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  // the below will work as the newCabin object is having the fields with same name
  // as we have in database
  // TO EDIT
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }
  // Upload the image
  if (hasImagePath) return data;

  // https://dbphnwbgpyndtfljpwkv.supabase.co/storage/v1/
  // object/public/cabin-images/cabin-001.jpg

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if there is image uploading file
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error("Cabin is not created due to image upload failure");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
};
