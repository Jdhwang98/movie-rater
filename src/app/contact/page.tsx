const page = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white">
            <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">Contact Us</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                    <p className="text-lg">
                        <span className="font-bold">Phone:</span> +1 (123) 456-7890
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">Email:</span> CodeCrusaders@CSULA.com
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-blue-600 hover:text-blue-400">
                            Facebook
                        </a>
                        <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300">
                            Twitter
                        </a>
                        <a href="https://instagram.com" className="text-pink-500 hover:text-pink-400">
                            Instagram
                        </a>
                        <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-500" >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="flex justify-center items-center mb-8">
                    <form action="https://getform.io/f/bxoozgva" method="POST" className="flex flex-col w-full md:w-1/2">
                        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                        <input type="text" name="name" placeholder="Enter your Name" className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none" />
                        <input type="tel" name="phone" placeholder="Enter your Phone Number" className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none" />
                        <input type="email" name="email" placeholder="Enter your Email" className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none" />
                        <textarea name="message" rows={10} placeholder="Enter your Message" className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none" />
                        <button className="text-white bg-gradient-to-b from-grey-900 to-gray-300 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                            Contact Us Today
                        </button>
                    </form>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
                    <p className="text-lg mb-4">
                        <span className="font-bold">Address:</span> 5151 State University Dr, Los Angeles, CA 90032
                    </p>
                    <div className="w-full">
                        <iframe
                            title="Google Maps Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.7087396929316!2d-118.1684135847824!3d34.06651938060585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c76aa0c5f3d3%3A0x52e7de343975746f!2s5151%20State%20University%20Dr%2C%20Los%20Angeles%2C%20CA%2090032!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            className="rounded-md border-2 border-gray-600"
                            loading="lazy"
                        ></iframe>

                    </div>
                </div>

                <div className="border-t border-gray-600 pt-6">
                    <h3 className="text-2xl font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <a href="/terms-and-conditions" className=" text-gray-400 hover:text-gray-200">Terms and Conditions</a>
                        <a href="/privacy-policy" className="p-2 text-gray-400 hover:text-gray-200">Privacy Policy</a>
                        <a href="/cookie-policy" className="p-2 text-gray-400 hover:text-gray-200">Cookie Policy</a>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default page;
