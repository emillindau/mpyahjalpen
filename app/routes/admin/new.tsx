import { Form, redirect, useActionData, useTransition } from "remix";
import type { ActionFunction } from "remix";
import { createHistoryItem } from "~/history";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 3000));
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: { title?: boolean; slug?: boolean; markdown?: boolean } = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createHistoryItem({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewHistory() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Title:
          {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        Slug:
        {errors?.slug && <em>Slug is required</em>}
        <input type="text" name="slug" />
      </p>
      <p>
        <label htmlFor="markdown">Markdown</label>
        {errors?.markdown && <em>Makrdown is required</em>}
        <br />
        <textarea rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating.." : "Create"}
        </button>
      </p>
    </Form>
  );
}
