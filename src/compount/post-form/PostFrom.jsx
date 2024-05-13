import React, { useCallback, useEffect } from "react";
import useFrom, { set } from "react-hook-form";
import { Container, Logo, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostFrom({ post }) {
  const { register, handleSumbit, watch, setValue, control, getValues } =
    useFrom({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      data.image[0] ? appwriteService.updateFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // make it more imporve what if the user want update
      const file = await appwriteService.updateFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSumbit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="title : "
          placeholder="Title "
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug : "
          placeholder="Slug "
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 ">
        <Input
          label="Featured Image : "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
        option={['active','inactive']}
        label='status'
        className='mb-4'
        {...register('status',{required:true})} />
        <Button 
        type='submit'
        bg={post? 'bg-green-500': undefined}
        className='w-full'
      >      {post ? 'Update':'submit'}   </Button>
      </div>
    </form>
  );
}

export default PostFrom;
