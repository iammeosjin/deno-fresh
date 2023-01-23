import { Spot } from '../models/spot.ts';
import { Reservation } from '../type.ts';
import toTitleCase from './to-title-case.ts';
import { DateTime } from 'https://cdn.skypack.dev/luxon?dts';

export default function receiptTemplate(
	reservation: Omit<Reservation, 'spot' | 'id'> & { spot: Spot },
) {
	return `
  <div>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="https://tacros.deno.dev/about#team" style="font-size:1.4em;color: #ef4444;text-decoration:none;font-weight:600">Jasaan Tourist Association Center</a>
        </div>
        <p style="font-size:1.1em">Hi ${toTitleCase(reservation.name)},</p>
            <p>
            Thank you for choosing Jasaan Tourist Association Center. This email is the receipt for your purchase.
            </p>
            <br/>
            <div
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
                src='https://tacros.deno.dev/images/logo.png'
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
                Fullname :
                <span style='font-weight: 600;'>
                  ${toTitleCase(reservation.name)}
                </span>
                <br />
                Email :
                <span style='font-weight: 600;'>
                ${reservation.email}
                </span>
                <br />
                Phone :
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
                Chosen Place:
                <span style='font-weight: 600;'>
                  ${toTitleCase(reservation.spot.name)}
                </span>
                <br />
                Address:
                <span style='font-weight: 600;'>
                ${reservation.spot.barangay}, ${reservation.spot.address}
                </span>
                <br />
                Date:
                <span style='font-weight: 600;'>
                  ${
		DateTime.fromJSDate(
			new Date(reservation.schedule),
		).setZone('utc+8').toFormat(
			'MMM dd, yyyy ccc hh:mm a',
		)
	}
                </span>
                <br />
                ${
		reservation.cottageType
			? `Chosen Cottage:
                  <span style='font-weight: 600;'>
                    ${toTitleCase(reservation.cottageType)}
                  </span>
                  <br />`
			: ''
	}
              
              </p>
            </div>
          </div>
        </div>
        <br/>
        <p>If you have any questions about this receipt, simply reply to this email or reach out to our <a href="https://tacros.deno.dev/contact">support team</a> for help.</p>
        <hr style="border:none;border-top:1px solid #eee" />
        Cheers,
        <br/>
        The Jasaan Tourist Association Center Team
      </div>
    </div>
  </div>
  `;
}
