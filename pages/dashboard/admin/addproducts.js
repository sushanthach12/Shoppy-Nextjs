import React, { useState } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'

const AddProducts = () => {

  const [content, setcontent] = useState([])
  const [showBanner, setShowBanner] = useState(false)

  const handleFileChange = (e) => {
    const files = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(files)
    reader.onload = () => {
      const con = JSON.parse(reader.result)
      setcontent(con)
    }
  }
  console.log(content);

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/addProducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('authToken')
      },
      body: JSON.stringify(content)
    })
    const response = await res.json()
    if (response.Success) {
      setInterval(() => {
        setShowBanner(true)
      }, 1500)
    }
  }


  return (
    <div>
      <div class="mt-5 md:col-span-2 md:mt-0 p-16">
        <div class="shadow sm:overflow-hidden sm:rounded-md">


          {showBanner && <div class="bg-gray-50">
            <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
              <div class="flex flex-wrap items-center justify-between">
                <div class="flex w-0 flex-1 justify-center items-center">
                  <BsPatchCheckFill size={20} color={"Green"} />
                  <p class="ml-3 truncate font-medium text-green-500 items-center">
                    Products added to db Successfuly!
                  </p>
                </div>

              </div>
            </div>
          </div>}



          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class=" flex flex-col justify-center items-center relative rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                      <span>Upload a JSON file</span>
                      <input id="file" name="file" type="file" accept='.json' onChange={handleFileChange} />
                    </label>
                    {/* <p class="pl-1">or drag and drop</p> */}
                  </div>
                </div>
              </div>
              {Object.keys(content).length !== 0 && <p class="text-base text-green-400 text-center p-4">File Uplaoded!</p>}
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSubmit}>Add Products</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddProducts