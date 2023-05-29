// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getGPTPrompt from '@/features/nlp/gptapi';
import { db } from '../../../common/config/FirebaseService';
import { ref, push, set } from 'firebase/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  // check the type of request
  const { method, body } = req;
  if (method === 'POST') {
    const { text, APIkey, title } = body;

    // const gptText =  `Topic 1: Measurement
    // Physical quantities and SI units
    // Base quantities and their SI units:
    // Mass – kilogram (kg)
    // Length – metre (m)
    // Time – second (s)
    // Current – ampere (A)
    // Temperature – kelvin (K)
    // Amount of substance – mole (mol)
    // A derived unit can be expressed as a combination of products or quotients of any of the base units.
    // Using SI base units to check the homogeneity of physical equations:
    // A physical equation is homogeneous if all the terms in the equation have the same units
    // If the equation involves addition or subtraction of quantities, the quantities that are added or subtracted must also have the same units
    // Equations that are valid must be homogeneous, but equations that are homogeneous are not necessarily valid
    // Conventions for labelling graph axes and table columns:
    // The table headers and graph axes must show the quantity and its corresponding unit (e.g. L / m)
    // The numerical labels for each axis should have the same number of decimal places
    // Prefixes and symbols to indicate decimal sub-multiples or multiples of both base and derived units:
    // Pico (p) – 10−12
    // Nano (n) – 10−9
    // Micro (µ) – 10−6
    // Milli (m) – 10−3
    // Centi (c) – 10−2
    // Deci (d) – 10−1
    // Kilo (k) – 103
    // Mega (M) – 106
    // Giga (G) – 109
    // Tera (T) – 1012
    // Estimates of physical quantities are made to judge the plausibility of any given quantity and estimate the sizes of further quantities, and are generally expressed to one significant figure.

    // Scalars and vectors
    // Distinction between scalar and vector quantities:
    // A scalar quantity is a quantity that has magnitude only
    // A vector quantity is a quantity that has both magnitude and direction
    // Examples of scalar quantities include mass, time, length, volume, temperature, density, speed, energy, pressure and current
    // Examples of vector quantities include displacement, velocity, acceleration, force and momentum
    // Addition and subtraction of coplanar vectors:
    // Parallel vectors can be added or subtracted using simple addition or subtraction
    // Non-parallel vectors can be added using either the parallelogram or triangle of vectors
    // Resultant vectors can be computed using scale drawing, Pythagoras theorem, sine and cosine rule or resolution and recombination of vectors
    // Representation of a vector as two perpendicular components:
    // |Rx| = |R| cosθ
    // |Ry| = |R| sinθ
    // θ is the angle between Rx and R

    // Errors and uncertainties
    // Distinction between systematic errors and random errors:
    // A systematic error is an error that has a constant magnitude and is either always positive or always negative
    // A random error is an error that has a varying magnitude and has an equal chance of being negative or positive
    // A zero error is an example of a systematic error
    // Distinction between precision and accuracy:
    // Precision refers to how close individual measurements are to one another, without reference to any true value
    // Accuracy refers to how close a measured value is to the true value
    // Assessing the uncertainty in a derived quantity:
    // When quantities are added or subtracted, the actual uncertainties of each quantity are added, i.e. z = x ± y ⇒ Δz = Δx + Δy
    // When quantities are multiplied or divided, the fractional / percentage uncertainty of the quantity to be calculated is the sum of the fractional / percentage uncertainties of each individual quantity, i.e. z = xy or z = x / y ⇒ Δz / z = Δx / x + Δy / y
    // If a quantity is multiplied by a constant, its actual uncertainty is also multiplied by the constant, i.e. z = kx ⇒ Δz = k Δx
    // If a quantity is raised to the nth power, its fractional uncertainty is given by the fractional / percentage uncertainty of the quantity multiplied by the absolute value of the index, i.e. z = xn ⇒ Δz / z = |n| (Δx / x)
    // For quantities calculated using other mathematical functions, the error can be estimated using numerical substitution, taking the difference between the largest or smallest possible value and the calculated value, whichever is greater`;

    const promptResult = await getGPTPrompt(text, APIkey);
    const result = JSON.parse(promptResult);
    const { summary, notes, quiz } = result;

    // add summary into firebase realtime database
    const putTopic = async () => {
      await push(ref(db, 'topic/'), {
        userId: 'testing',
        title,
        summary,
        notes
      }).then(async res => {
        await putQuestions(res.key);
      });
    };

    // add questions into firebase realtime database
    const putQuestions = async (topicId: string | null) => {
      if (topicId) {
        await set(ref(db, 'questions/' + topicId), {
          quiz
        });
      }
    };

    await putTopic()
      .then(() => {
        return res.status(200).json({
          data: {
            title,
            message: 'Successfully created',
            summary,
            quiz
          }
        });
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({
          message: 'Something went wrong'
        });
      });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
