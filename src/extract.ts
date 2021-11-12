import pdf_tool from 'pdf-to-text'
import fs from 'fs'
import path from 'path'

const pdf_path = path.join(process.cwd(), 'assets', 'coordinates.pdf')
const json_path = path.join(process.cwd(), 'assets', 'coordinates.json')

pdf_tool.pdfToText(pdf_path, function (error, data) {
   if (error) throw error
   const re = /(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/g
   const obj = {
      coords: data
         .match(re)
         .map((item: string) => item.replace(',', ''))
         .map((item: string) => item.split(' '))
         .filter((item) => item.length === 2)
         .map((item) => ({ lat: item[0], lon: item[1] })),
   }

   fs.writeFileSync(json_path, JSON.stringify(obj))
   console.log('Data written to a json file successfully!')
})
