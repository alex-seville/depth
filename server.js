
import express from 'express' 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from "fs";

import { pipeline, RawImage, env } from '@xenova/transformers';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

env.localModelPath = __dirname + '/models/';
env.allowRemoteModels = false;

const depth_estimator = await pipeline('depth-estimation', 'Xenova/depth-anything-small-hf');





const app = express();


const PORT = process.env.PORT || 8002;


app.get('/depth', async (req,res) => {
	console.log("url:",req.query.url)
  const out = await depth_estimator(req.query.url);


  //console.log(out.depth)
	res.json(out.depth)
      
 

	
});





app.listen(PORT, () => console.log(`App listening at port ${PORT}`));



