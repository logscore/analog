
import { useState } from "react";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {
  "id": process.env.NEXT_PUBLIC_EMAIL_FORM_ID || "",
  "name": "Default",
  "formStyle": "inline",
  "placeholderText": "you@example.com",
  "formFont": "Inter",
  "formFontColor": "#000000",
  "formFontSizePx": 14,
  "buttonText": "Join",
  "buttonFont": "Inter",
  "buttonFontColor": "#ffffff",
  "buttonColor": "#000000",
  "buttonFontSizePx": 14,
  "successMessage": "Thanks! Let's build the best calendar to ever exist.",
  "successFont": "Open Sans",
  "successFontColor": "#000000",
  "successFontSizePx": 15,
  "userGroup": "analog_waitlist"
}
const domain = "app.loops.so"

export default function SignUpFormReact() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<typeof formStates[number]>(INIT);
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({})

  const resetForm = () => {
    setEmail("");
    setFormState(INIT);
    setErrorMessage("");
  };

  /**
   * Rate limit the number of submissions allowed
   * @returns {boolean} true if the form has been successfully submitted in the past minute
   */
  const hasRecentSubmission = () => {
    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem("loops-form-timestamp");

    // Indicate if the last sign up was less than a minute ago
    if (
      previousTimestamp &&
      Number(previousTimestamp) + 60 * 1000 > timestamp
    ) {
      setFormState(ERROR);
      setErrorMessage("Too many signups, please try again in a little while");
      return true;
    }

    localStorage.setItem("loops-form-timestamp", timestamp.toString());
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault();

    // boundary conditions for submission
    if (formState !== INIT) return;
    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (hasRecentSubmission()) return;
    setFormState(SUBMITTING);

    // build additional fields
    const additionalFields = new URLSearchParams();
    Object.entries(fields).forEach(([key, val]) => {
      if (val) {
        additionalFields.append(key, val);
      }
    });

    // build body
    const formBody = `userGroup=${encodeURIComponent(
      formStyles.userGroup
    )}&email=${encodeURIComponent(email)}&mailingLists=`;

    // API request to add user to newsletter
    fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
      method: "POST",
      body: formBody + additionalFields.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm();
          setFormState(SUCCESS);
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR);
            setErrorMessage(data.message || res.statusText);
            localStorage.setItem("loops-form-timestamp", "");
          });
        }
      })
      .catch((error) => {
        setFormState(ERROR);
        // check for cloudflare error
        if (error.message === "Failed to fetch") {
          setErrorMessage("Too many signups, please try again in a little while");
        } else if (error.message) {
          setErrorMessage(error.message);
        }
        localStorage.setItem("loops-form-timestamp", "");
      });
  };

  const isInline = formStyles.formStyle === "inline";

  switch (formState) {
    case SUCCESS:
      return (
        <div
          className="flex items-center justify-center w-full"
        >
          <p
            className={
              'font-open-sans text-[15px] text-black dark:text-white'
            }
          >
            {formStyles.successMessage}
          </p>
        </div>
      );
    case ERROR:
      return (
        <>
          <SignUpFormError />
          <BackButton />
        </>
      );
    default:
      return (
        <>
          <form
            onSubmit={handleSubmit}
            className={`flex ${isInline ? "flex-row" : "flex-col"} items-center justify-center w-full`}
          >
            <input
              type="text"
              name="email"
              placeholder={formStyles.placeholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              className=
                  {`text-[${formStyles.formFontColor}] font-[${formStyles.formFont}] text-[${formStyles.formFontSizePx}px] ${isInline ? "mr-4 mb-0" : "mb-10"} w-full max-w-[300px] min-w-[100px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2`}
            />
            <div aria-hidden="true" style={{ position: "absolute", left: "-2024px" }}>
                
            </div>
            <SignUpFormButton />
          </form>
        </>
      );
  }

  function SignUpFormError() {
    return (
      <div
        className="flex items-center justify-center w-full"
      >
        <p
          className="font-open-sans text-[14px] text-[#b91c1c]"
        >
          {errorMessage || "Oops! Something went wrong, please try again"}
        </p>
      </div>
    );
  }

  function BackButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        className="text-center m-auto mt-10 font-inter text-sm bg-transparent border-none cursor-pointer hover:underline"
        onMouseOut={() => setIsHovered(false)}
        onMouseOver={() => setIsHovered(true)}
        onClick={resetForm}
      >
        &larr; Back
      </button>
    );
  }

  function SignUpFormButton({ props }: any) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
  
    return (
      <button
        type="submit"
        className={`
          hover:bg-[#222222] bg-[#000000] dark:bg-[#121212] border-[1px] dark:border-[#2d2d2d] text-[#ffffff] font-[${formStyles.buttonFont}] ${isInline ? 'w-min' : 'w-full'} max-w-[300px] ${isInline ? 'whitespace-nowrap' : 'whitespace-normal'} h-[38px] flex items-center justify-center flex-row px-[9px] py-[17px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] text-center font-medium leading-[20px] border-[1px_solid_rgb(50,50,50)] cursor-pointer transition-colors duration-200 ease-in-out
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {formState === SUBMITTING ? "Please wait..." : formStyles.buttonText}
      </button>
    );
  }
}

function isValidEmail(email: any) {
  return /.+@.+/.test(email);
}