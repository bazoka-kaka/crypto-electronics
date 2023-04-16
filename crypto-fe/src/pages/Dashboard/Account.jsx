const Account = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Account</h1>
      <div className="w-full p-5 mt-6 border-2 border-gray-200 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-700">
          Personal Information
        </h2>
        <div className="mt-4">
          <h3>Avatar</h3>
          <div className="flex items-center gap-8 mt-2">
            <img
              src="/portrait.jpg"
              alt=""
              className="object-cover rounded-md w-28 h-28"
            />
            <div className="flex items-center gap-8">
              <button className="px-4 py-2 font-semibold text-blue-600 transition duration-200 border-2 border-blue-600 rounded-md hover:text-gray-50 hover:bg-blue-600">
                Change
              </button>
              <button className="font-semibold text-gray-500 transition duration-200 hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        </div>
        <form>
          <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-700">
              Notifications
            </h2>
            <div className="mt-2">
              <input type="checkbox" id="offers" name="notifications" />{" "}
              <label htmlFor="offers">Interesting Offers</label>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="payment_status" name="notifications" />{" "}
              <label htmlFor="payment_status">Payment Status</label>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="updates" name="notifications" />{" "}
              <label htmlFor="updates">Product Updates</label>
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <button
              type="button"
              className="p-2 font-semibold text-red-400 transition duration-200 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-gray-50"
            >
              Logout
            </button>
            <button
              type="button"
              className="p-2 font-semibold text-gray-400 border-2 border-gray-400 rounded-md"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
