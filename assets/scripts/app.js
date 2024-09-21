var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mainForm = document.getElementById("cv-form");
mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
const previewSc = document.getElementById("preview-sc");
const btnsSection = document.querySelector(".print-btn-sc");
const backButton = document.querySelector(".back-btn");
let firstnameElem = mainForm.firstname, middlenameElem = mainForm.middlename, lastnameElem = mainForm.lastname, imageElem = mainForm.image, designationElem = mainForm.designation, addressElem = mainForm.address, emailElem = mainForm.email, phonenoElem = mainForm.phoneno, summaryElem = mainForm.summary, achievement_title = document.querySelector(".achieve_title"), achievement_description = document.querySelector(".achieve_description"), exp_title = document.querySelector(".exp_title"), exp_organization = document.querySelector(".exp_organization"), exp_location = document.querySelector(".exp_location"), exp_start_date = document.querySelector(".exp_start_date"), exp_end_date = document.querySelector(".exp_end_date"), exp_description = document.querySelector(".exp_description"), edu_school = document.querySelector(".edu_school"), edu_degree = document.querySelector(".edu_degree"), edu_city = document.querySelector(".edu_city"), edu_start_date = document.querySelector(".edu_start_date"), edu_graduation_date = document.querySelector(".edu_graduation_date"), edu_description = document.querySelector(".edu_description"), proj_title = document.querySelector(".proj_title"), proj_link = document.querySelector(".proj_link"), proj_description = document.querySelector(".proj_description"), skills = document.querySelector(".skill");
let nameDsp = document.getElementById("fullname_dsp"), imageDsp = document.getElementById("image_dsp"), phonenoDsp = document.getElementById("phoneno_dsp"), emailDsp = document.getElementById("email_dsp"), addressDsp = document.getElementById("address_dsp"), designationDsp = document.getElementById("designation_dsp"), summaryDsp = document.getElementById("summary_dsp"), projectsDsp = document.getElementById("projects_dsp"), achievementsDsp = document.getElementById("achievements_dsp"), skillsDsp = document.getElementById("skills_dsp"), educationsDsp = document.getElementById("educations_dsp"), experiencesDsp = document.getElementById("experiences_dsp"), shareBtn = document.querySelector(".share-btn");
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
const handleImageUpload = (imageElem) => __awaiter(this, void 0, void 0, function* () {
    const photoFile = imageElem.files ? imageElem.files[0] : null;
    if (photoFile) {
        try {
            const photoBase64 = yield fileToBase64(photoFile);
            localStorage.setItem("resumePhoto", photoBase64);
            imageDsp.src = photoBase64; // Display the new image immediately
        }
        catch (error) {
            console.error("Error converting file to Base64:", error);
        }
    }
    else {
        console.log("No file selected.");
    }
});
const getUserInputs = () => {
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievement_title: achievement_title.value,
        achievement_description: achievement_description.value,
        exp_title: exp_title.value,
        exp_organization: exp_organization.value,
        exp_location: exp_location.value,
        exp_start_date: exp_start_date.value,
        exp_end_date: exp_end_date.value,
        exp_description: exp_description.value,
        edu_school: edu_school.value,
        edu_degree: edu_degree.value,
        edu_city: edu_city.value,
        edu_start_date: edu_start_date.value,
        edu_graduation_date: edu_graduation_date.value,
        edu_description: edu_description.value,
        proj_title: proj_title.value,
        proj_link: proj_link.value,
        proj_description: proj_description.value,
        skills: skills.value,
    };
};
const displayCV = (userData) => {
    nameDsp.innerHTML = ` ${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    achievementsDsp.innerHTML = ` ${userData.achievement_title}: ${userData.achievement_description}`;
    (experiencesDsp.innerHTML = `${userData.exp_title}, ${userData.exp_organization}`),
        `${userData.exp_location} (${userData.exp_start_date} - ${userData.exp_end_date}): ${userData.exp_description};`;
    educationsDsp.innerHTML = `${userData.edu_degree} at ${userData.edu_school}, ${userData.edu_city} (${userData.edu_start_date} - ${userData.edu_graduation_date}): ${userData.edu_description};`;
    projectsDsp.innerHTML = `${userData.proj_title.replace(/,/g, "<br>")} <br> <a href="${userData.proj_link.replace(/,/g, "<br>")}}">${userData.proj_link.replace(/,/g, "<br>")}</a><br>${userData.proj_description.replace(/,/g, "<br>")}`;
    skillsDsp.innerHTML = userData.skills;
};
const generateCV = () => {
    const requiredFields = [
        firstnameElem,
        middlenameElem,
        lastnameElem,
        designationElem,
        addressElem,
        emailElem,
        phonenoElem,
        summaryElem,
        achievement_title,
        achievement_description,
        exp_title,
        exp_organization,
        exp_location,
        exp_start_date,
        exp_end_date,
        exp_description,
        edu_school,
        edu_degree,
        edu_city,
        edu_start_date,
        edu_graduation_date,
        edu_description,
        proj_title,
        proj_link,
        proj_description,
        skills,
    ];
    let allFieldsFilled = true;
    requiredFields.forEach((field) => {
        if (field.value.trim() === "") {
            allFieldsFilled = false;
            field.classList.add("error");
        }
        else {
            field.classList.remove("error");
        }
    });
    if (allFieldsFilled) {
        let userData = getUserInputs();
        displayCV(userData);
        const queryParams = new URLSearchParams({
            firstname: userData.firstname,
            middlename: userData.middlename,
            lastname: userData.lastname,
            designation: userData.designation,
            address: userData.address,
            email: userData.email,
            phoneno: userData.phoneno,
            summary: userData.summary,
            achievement_title: userData.achievement_title,
            achievement_description: userData.achievement_description,
            exp_title: userData.exp_title,
            exp_organization: userData.exp_organization,
            exp_location: userData.exp_location,
            exp_start_date: userData.exp_start_date,
            exp_end_date: userData.exp_end_date,
            exp_description: userData.exp_description,
            edu_school: userData.edu_school,
            edu_degree: userData.edu_degree,
            edu_city: userData.edu_city,
            edu_start_date: userData.edu_start_date,
            edu_graduation_date: userData.edu_graduation_date,
            edu_description: userData.edu_description,
            proj_title: userData.proj_title,
            proj_link: userData.proj_link,
            proj_description: userData.proj_description,
            skills: userData.skills,
        });
        previewSc.style.display = "block";
        mainForm.style.display = "none";
        const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`;
        window.history.replaceState(null, "", uniqueUrl);
    }
    else {
    }
    conditionalButtonsRendering();
};
const conditionalButtonsRendering = () => {
    if (mainForm.style.display === "none") {
        btnsSection.style.display = "block";
        backButton.style.display = "block";
    }
    else {
        btnsSection.style.display = "none";
        backButton.style.display = "none";
    }
};
conditionalButtonsRendering();
function backToForm() {
    backButton.addEventListener("click", () => {
        mainForm.style.display = "block";
        previewSc.style.display = "none";
        const params = new URLSearchParams(window.location.search);
        if (params.toString().length > 0) {
            firstnameElem.value = params.get("firstname") || "";
            middlenameElem.value = params.get("middlename") || "";
            lastnameElem.value = params.get("lastname") || "";
            designationElem.value = params.get("designation") || "";
            addressElem.value = params.get("address") || "";
            emailElem.value = params.get("email") || "";
            phonenoElem.value = params.get("phoneno") || "";
            summaryElem.value = params.get("summary") || "";
            achievement_title.value = params.get("achievement_title") || "";
            achievement_description.value =
                params.get("achievement_description") || "";
            exp_title.value = params.get("exp_title") || "";
            exp_organization.value = params.get("exp_organization") || "";
            exp_location.value = params.get("exp_location") || "";
            exp_start_date.value = params.get("exp_start_date") || "";
            exp_end_date.value = params.get("exp_end_date") || "";
            exp_description.value = params.get("exp_description") || "";
            edu_school.value = params.get("edu_school") || "";
            edu_degree.value = params.get("edu_degree") || "";
            edu_city.value = params.get("edu_city") || "";
            edu_start_date.value = params.get("edu_start_date") || "";
            edu_graduation_date.value = params.get("edu_graduation_date") || "";
            edu_description.value = params.get("edu_description") || "";
            proj_title.value = params.get("proj_title") || "";
            proj_link.value = params.get("proj_link") || "";
            proj_description.value = params.get("proj_description") || "";
            skills.value = params.get("skills") || "";
        }
        conditionalButtonsRendering();
    });
}
conditionalButtonsRendering();
function previewImage() {
    let oFReader = new FileReader();
    if (imageElem.files && imageElem.files[0]) {
        oFReader.readAsDataURL(imageElem.files[0]);
        oFReader.onload = function (ofEvent) {
            if (ofEvent.target && ofEvent.target.result) {
                imageDsp.src = ofEvent.target.result;
            }
        };
    }
}
function printCV() {
    window.print();
}
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.toString().length > 0) {
        mainForm.style.display = "none";
        previewSc.style.display = "block";
        const userData = {
            firstname: params.get("firstname") || "",
            middlename: params.get("middlename") || "",
            lastname: params.get("lastname") || "",
            designation: params.get("designation") || "",
            address: params.get("address") || "",
            email: params.get("email") || "",
            phoneno: params.get("phoneno") || "",
            summary: params.get("summary") || "",
            achievement_title: params.get("achievement_title") || "",
            achievement_description: params.get("achievement_description") || "",
            exp_title: params.get("exp_title") || "",
            exp_organization: params.get("exp_organization") || "",
            exp_location: params.get("exp_location") || "",
            exp_start_date: params.get("exp_start_date") || "",
            exp_end_date: params.get("exp_end_date") || "",
            exp_description: params.get("exp_description") || "",
            edu_school: params.get("edu_school") || "",
            edu_degree: params.get("edu_degree") || "",
            edu_city: params.get("edu_city") || "",
            edu_start_date: params.get("edu_start_date") || "",
            edu_graduation_date: params.get("edu_graduation_date") || "",
            edu_description: params.get("edu_description") || "",
            proj_title: params.get("proj_title") || "",
            proj_link: params.get("proj_link") || "",
            proj_description: params.get("proj_description") || "",
            skills: params.get("skills") || "",
        };
        const storedImage = localStorage.getItem("resumePhoto");
        if (storedImage) {
            imageDsp.src = storedImage;
        }
        imageElem.addEventListener("change", () => {
            handleImageUpload(imageElem);
        });
        displayCV(userData);
        shareBtn.addEventListener("click", () => {
            const originalHTML = shareBtn.innerHTML;
            shareBtn.innerHTML = `<i class="ri-checkbox-circle-line"></i>`;
            setTimeout(() => {
                shareBtn.innerHTML = originalHTML;
            }, 1500);
            navigator.clipboard.writeText(uniqueUrl);
        });
        window.history.replaceState(null, "", uniqueUrl);
    }
    else {
        mainForm.style.display = "block";
        previewSc.style.display = "none";
    }
    conditionalButtonsRendering();
});