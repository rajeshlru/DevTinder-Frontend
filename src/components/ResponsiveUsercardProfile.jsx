import React from "react";
import UsercardProfile from "./UsercardProfile";

const ResponsiveUsercardProfile = (props) => {
  return (
    <div className="responsive-profile-container">
      <style>
        {`
          .responsive-profile-container {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .responsive-profile-wrapper {
            width: 100%;
            max-width: 1200px;
            position: relative;
          }
          
          /* Mobile first approach */
          @media (max-width: 768px) {
            .responsive-profile-wrapper {
              padding: 0 1rem;
            }
            
            /* Fix for the profile card width issue on mobile */
            .responsive-profile-wrapper > div {
              width: 100% !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            
            /* Fix for the photo update section positioning */
            .responsive-profile-wrapper .absolute.bottom-0 {
              position: relative !important;
              bottom: unset !important;
              right: unset !important;
              margin-top: 1rem;
              justify-content: center;
              width: 100%;
            }
            
            /* Adjust photo update input width */
            .responsive-profile-wrapper .absolute.bottom-0 input {
              width: 60% !important;
            }
            
            /* Center buttons on mobile */
            .responsive-profile-wrapper .flex.gap-11 {
              flex-direction: column;
              gap: 1rem !important;
              align-items: center;
            }
            
            /* Adjust button widths */
            .responsive-profile-wrapper .flex.gap-11 > div {
              width: 100%;
              display: flex;
              justify-content: center;
            }
            
            /* Fix password form width on mobile */
            .responsive-profile-wrapper .relative.w-\\[125\\%\\] {
              width: 100% !important;
              margin-left: 0 !important;
            }
          }
          
          /* Tablet styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .responsive-profile-wrapper {
              padding: 0 2rem;
            }
            
            /* Adjust photo update positioning for tablet */
            .responsive-profile-wrapper .absolute.bottom-0 {
              right: -4rem !important;
            }
          }
          
          /* Desktop styles */
          @media (min-width: 1025px) {
            .responsive-profile-wrapper {
              padding: 0;
            }
          }
        `}
      </style>

      <div className="responsive-profile-wrapper">
        <UsercardProfile {...props} />
      </div>
    </div>
  );
};

export default ResponsiveUsercardProfile;
