import type { Bucket } from "@/server/bucket";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function uploadFileToSignedUrl({
  file,
  path,
  token,
  bucket,
}: {
  file: File;
  path: string;
  token: string;
  bucket: Bucket;
}) {
  try {
    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .uploadToSignedUrl(path, token, file);

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("No data returned from uploadToSignedUrl");
    }

    const fileUrl = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return fileUrl.data.publicUrl;
  } catch (error) {
    throw error;
  }
}

export async function deleteFileFromBucket({
  path,
  bucket,
}: {
  path: string;
  bucket: Bucket;
}) {
  try {
    await supabaseClient.storage.from(bucket).remove([path]);
  } catch (error) {
    throw error;
  }
}

export function extractPathFromSupabaseUrl(url: string): string | null {
  const regex = /\/storage\/v1\/object\/public\/(.+)$/;
  const match = regex.exec(url);
  return match && typeof match[1] === "string" ? match[1] : null;
}