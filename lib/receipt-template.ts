import { Spot } from '../models/spot.ts';
import { Reservation } from '../type.ts';
import toTitleCase from './to-title-case.ts';

export default function receiptTemplate(
	reservation: Omit<Reservation, 'spot'> & { spot: Spot },
) {
	return `<div
    id='invoice-POS'
    style='box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
          padding: 1rem;
          margin: 10px auto;
          width: 20rem;
          background: #FFF;
          justify-items: center;
          '
  >
    <div style='width: 100%; 
          flex-wrap: wrap;'>
      <div style='width: 100%; 
            align-items: center; 
            margin-left: auto;
            margin-right: auto;
            display: grid;
            place-items: center;'>
        <img
          src='/images/logo.png'
          style='height: 10rem;
                width: 10rem;
                margin-right: 0.5rem;'
          alt=''
        />
      </div>
      <div style='height: 2rem; line-height: 2rem; width: 100%; text-align: center;'>
        <h2 style='font-size: 1.1rem; line-height: 2rem;'>
          Jasaan Tourist Association Center
        </h2>
      </div>
    </div>
    <hr />
    <div>
      <div>
        <h2 style='font-size: 1rem; line-height: 2rem; font-weight: 600;'>
          Contact Info
        </h2>
        <p style='font-size: 0.9rem;'>
          Fullname :{' '}
          <span style='font-weight: 600;'>
            ${reservation.name}
          </span>
          <br />
          Email :{' '}
          <span style='font-weight: 600;'>
           ${reservation.email}
          </span>
          <br />
          Phone :{' '}
          <span style='font-weight: 600;'>
            +63${reservation.mobileNumber}
          </span>
          <br />
        </p>
      </div>
      <hr />
      <div>
        <h2 style='font-size: 1rem; line-height: 2rem; font-weight: 600;'>
          Reservation
        </h2>
        <p style='font-size: 0.9rem;'>
          Chosen Place:{' '}
          <span style='font-weight: 600;'>
            ${reservation.spot.name}
          </span>
          <br />
          Address:{' '}
          <span style='font-weight: 600;'>
          ${reservation.spot.barangay}, ${reservation.spot.address}
          </span>
          <br />
          ${
		reservation.cottageType
			? `Chosen Cottage:{' '}
            <span style='font-weight: 600;'>
              ${toTitleCase(reservation.cottageType)}
            </span>
            <br />`
			: ''
	}
         
        </p>
      </div>
    </div>
  </div>`;
}
