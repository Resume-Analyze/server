const getPromptForResumeExtraction = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  return `
Extract the following information from a resume accurately and in detail. Use the current date (${currentDate}) when necessary (e.g., for calculating durations). Follow the instructions carefully:

   1. Name: Extract the full name of the individual.

   2. Email: Extract the email address, if available.

   3. Phone Number: Extract the phone number.

   4. Education: Provide details for each education level, including:
        Type: Specify whether it's College, 12th (Higher Secondary), or 10th (Secondary School).
        Details:
            Institution Name: Name of the college or school.
            Degree/Branch: For College, include degree and branch details (e.g., B.Tech in Electronics and Communication Engineering).
            Duration: Duration of study (e.g., August 2019 - May 2023).
            CGPA/Percentage: Include CGPA or percentage, if mentioned.
            Board: For 10th and 12th, mention the education board (e.g., CBSE).

   4. Links: Extract all useful links, including:
        Shorthand: Label for the platform (e.g., Codeforces, GitHub).
        Link: URL of the profile or portfolio.
        Display Name: Username or display name.

   5. Skills: Extract all mentioned skills, categorizing them as:
        Languages: E.g., JavaScript, C++.
        Web Technologies: E.g., MongoDB, Spring Boot.
        Computer Fundamentals: E.g., Data Structures and Algorithms, OOPS.

   6. Experience:
        Total Years of Experience: Calculate the total years of professional experience.
        Details: For each job, extract:
            Company: Name of the company.
            Designation: Job title.
            Type: Employment type (e.g., Full-time, Internship).
            Duration: Employment period (e.g., Feb 2023 - Present).
            Description Points: List the key responsibilities and achievements in bullet points (maximum upto 5-6 points).
            Technologies Used: Extract the technologies/tools used during the job.

   7. Projects:
        Title: Name of the project.
        Description Points: Key objectives and outcomes (bullet points for clarity (maximum upto 5-6 points)).
        Technologies Used: List all technologies/tools used in the project.
        Link: Provide the project link (starts with https) if available.
  8. Achievements: List all achievements in detail, including coding contest ratings, rankings, and notable accomplishments (maximum upto 4-5 points).

    Example Output: Provide the extracted information in the following JSON format:
    {
  "Name": "<value or empty string>",
  "Email": "<value or empty string>",
  "PhoneNumber": "<value or empty string>",
  "Education": {
    "College": {
      "Name": "<value or empty string>",
      "Degree": "<value or empty string>",
      "Branch": "<value or empty string>",
      "Duration": "<value or empty string>",
      "CGPA": "<value or empty string>"
    },
    "12th": {
      "SchoolName": "<value or empty string>",
      "Board": "<value or empty string>",
      "Duration": "<value or empty string>",
      "Percentage": "<value or empty string>"
    },
    "10th": {
      "SchoolName": "<value or empty string>",
      "Board": "<value or empty string>",
      "Duration": "<value or empty string>",
      "CGPA": "<value or empty string>"
    }
  },
  "Links": [
    {
      "Shorthand": "<value or empty string>",
      "Link": "<value or empty string>",
      "DisplayName": "<value or empty string>"
    },
    ...
  ],
  "Skills": {
    "Languages": ["<language1>", "<language2>", ...],
    "WebTechnologies": ["<technology1>", "<technology2>", ...],
    "ComputerFundamentals": ["<fundamental1>", "<fundamental2>", ...]
  },
  "Experience": {
    "TotalYears": "<value or empty string>",
    "Details": [
      {
        "Company": "<value or empty string>",
        "Designation": "<value or empty string>",
        "Type": "<value or empty string>",
        "Duration": "<value or empty string>",
        "DescriptionPoints": ["<point1>", "<point2>", ...],
        "TechnologiesUsed": ["<tech1>", "<tech2>", ...]
      },
      ...
    ]
  },
  "Projects": [
    {
      "Title": "<value or empty string>",
      "DescriptionPoints": ["<point1>", "<point2>", ...],
      "TechnologiesUsed": ["<tech1>", "<tech2>", ...],
      "Link": "<value or empty string>"
    },
    ...
  ],
  "Achievements": ["<achievement1>", "<achievement2>", ...]
}`;
};

module.exports = {
  getPromptForResumeExtraction
}