"use client";

export const Form = () => {
  return (
    <div className="border-2 p-4 tracking-tighter sm:text-s shadow-md w-3/4 rounded-md">
      <form
        method="POST"
        action="https://www.formbackend.com/f/664decaabbf1c319"
      >
        <div>
          <div>
            <label>Name</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              className="border-2 w-3/4 rounded-md p-1 bg-stone-100"
            />
          </div>
        </div>

        <div className="py-3">
          <div>
            <label>Email</label>
          </div>
          <div>
            <input
              type="text"
              name="email"
              className="border-2 w-3/4 rounded-md p-1 bg-stone-100"
            />
          </div>
        </div>

        <div className="py-3">
          <div>
            <label>What can we help you with?</label>
          </div>
          <div>
            <textarea
              name="message"
              className="border-2 w-3/4 rounded-md p-1 bg-stone-100"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="bg-neutral-600 text-white px-5 rounded-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
