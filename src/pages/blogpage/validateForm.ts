type Post = {
  title: string;
  short_content: string;
  photo: Blob | undefined;
  content: string;
}
type Request = {
  validate: {
      title: boolean;
      short_content: boolean;
      content: boolean;
      photo: {
          type: boolean;
          size: boolean;
      };
  };
  isLoading: boolean;
  error: null;
}

export const formValidate = (post: Post, request: Request) => {
  const { title, short_content, content, photo } = post;
  if (short_content === '') {
    request.validate.short_content = true
  } else request.validate.short_content = false;
  if (content === '') {
    request.validate.content = true
  } else request.validate.content = false;
  if (title === '') {
    request.validate.title = true;
  } else request.validate.title = false
  if ((photo && photo.type !== "image/png") || (photo && photo.type !== "image/jpg")) {
    request.validate.photo.type = true;
  } else request.validate.photo.type = false;
  if (photo && photo.size > 3_000_000) {
    request.validate.photo.size = true;
  } else request.validate.photo.size = false;
  if (title === '' || content === '' || short_content === '') {
    return false;
  }
  return true;
}
