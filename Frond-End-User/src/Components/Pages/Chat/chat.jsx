import React from 'react'

function Chat() {

    


  return (
    <>
          <div class="flex h-screen antialiased text-gray-800 ">
              <div class="flex flex-row h-full w-full overflow-x-hidden">
                  <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                      <div
                          class="flex flex-col items-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                      >
                          <div class="h-20 w-20 rounded-full object-cover overflow-hidden">
                              <img
                                  src="https://cdn4.sharechat.com/Y7wdD55E7dtRp5PD0OeVfRKR4GLl3nsvYe7v_new_compressed_thumb.jpeg"
                                  alt="Avatar"
                                  class="h-full w-full"
                              />
                          </div>
                          <div class="text-sm text-white font-semibold mt-2">rasheed</div>

                      </div>
                      <div class="flex flex-col mt-8">
                          <div class="flex flex-row items-center justify-between text-xs">
                              <span class="font-bold text-base">Messages</span>
                              <span
                                  class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
                              >10</span>
                          </div>
                          <div class="flex flex-col space-y-1 mt-5 -mx-2 h-96 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                              {/* {vendors?.map((vendor) => ( */}
                                  <button
                                      // onClick={() => handleSelect(vendor)}
                                      class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                  >
                                      <div
                                          class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
                                      >
                                          {/* <img src={vendor?.profilePhoto || team1} className="rounded-lg" /> */}
                                      </div>
                                      <div class="ml-2 text-sm font-semibold">vendor name</div>
                                      <div
                                          class="flex items-center justify-center ml-auto text-xs text-white bg-gray-500 h-4 w-4 rounded leading-none"
                                      >
                                          {10}
                                      </div>
                                  </button>
                              {/* ))} */}
                          </div>
                      </div>
                  </div>
                  <div class="flex flex-col flex-auto h-full p-6">
                      <div
                          class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                      >
                          <div class="flex flex-col h-full overflow-x-auto mb-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                              <div class="flex flex-col h-full">
                                  <div class="grid grid-cols-12 gap-y-2">
                                      {/* {showMsg && message?.map((msg) =>
                                          msg?.myself ? ( */}

                                              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                                  <div class="flex items-center justify-start flex-row-reverse">
                                                      <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-800 to-indigo-900 text-white flex-shrink-0"
                                                      >
                                                          <img
                                                              src="https://cdn4.sharechat.com/Y7wdD55E7dtRp5PD0OeVfRKR4GLl3nsvYe7v_new_compressed_thumb.jpeg"
                                                              alt="Avatar"
                                                              class="h-full w-full rounded-lg"
                                                          />
                                                      </div>
                                                      <div
                                                          class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                      >
                                                          <div>message</div>
                                                      </div>
                                                  </div>
                                              </div>

                                          
                                      {/* <div ref={scrolRef} /> */}
                                  </div>
                              </div>
                          </div>
                          <form 
                              class="flex flex-row items-center h-6 rounded-xl  w-full px-4"
                          >

                              <div class="flex-grow ml-4">
                                  <div class="relative w-full">
                                      <input
                                          // onChange={(e) => setInputMessage(e.target.value)}
                                          // value={inputMessage}
                                          type="text"
                                          className="block w-full border-0 flex-1 rounded-lg sm:text-sm"
                                      />
                                  </div>
                              </div>
                              <div class="ml-4">
                                  <button type="submit" class="flex items-center justify-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                      <span>Send</span>
                                      <span class="ml-2">
                                          <svg
                                              class="w-4 h-4 transform rotate-45 -mt-px"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                          >
                                              <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                              ></path>
                                          </svg>
                                      </span>
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>

          
      </>
  )
}

export default Chat