const burgerBtn = document.querySelector(".header__top-burger-btn")
const navMobile = document.querySelector(".nav-mobile")
const navMobileCloseBtn = document.querySelector(".nav-mobile__btn-close")

const navDesktopLinks = document.querySelectorAll(".nav-desktop__item")
const scrollSpySections = document.querySelectorAll(".section")

const navMobileItems = document.querySelectorAll(".nav-mobile__item")
let activeSectionId = ""
const inputName = document.querySelector(".input-name")
const inputMail = document.querySelector(".input-mail")
const inputPhone = document.querySelector(".input-phone")
const textArea = document.querySelector(".form__box-textarea")
const checkbox = document.querySelector(".checkbox-info__input")
const formLabels = document.querySelectorAll(".form__box-label")
const nameBugText = document.querySelector(".name-bug-text")
const mailBugText = document.querySelector(".mail-bug-text")
const phoneBugText = document.querySelector(".phone-bug-text")
const messageBugText = document.querySelector(".message-bug-text")
const checkboxBugText = document.querySelector(".checkbox-info__bug-text")
const formButtonClear = document.querySelector(".button__clear")
const formButtonSend = document.querySelector(".button__send")
const popup = document.querySelector(".form__popup")
const closePopupBtn = document.querySelector(".form__popup-close-btn")
const popupFormWarp = document.querySelector(".form__popup-wrapper")

// scrollspy

const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = []

		scrollSpySections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 64) {
				sections.push(section)

				const activeSection = document.querySelector(
					`.nav-desktop__item[href*="${sections[0].id}"]`
				)

				navDesktopLinks.forEach(link => {
					link.classList.remove("active-nav-link")
				})

				activeSection.classList.add("active-nav-link")
			}
		})
	} else if (document.body.classList.contains("contact-page")) {
		navDesktopLinks.forEach(link => {
			link.classList.remove("active-nav-link")
		})
		const lastIndex = navDesktopLinks.length - 1
		navDesktopLinks[lastIndex].classList.add("active-nav-link")
	} else if (
		document.body.classList.contains("offer-page") ||
		document.body.classList.contains("error-page")
	) {
		navDesktopLinks.forEach(link => {
			link.classList.remove("active-nav-link")
		})
	}
}

// dynamic addition of user data to the comments section

function addUserComments() {
	const userNames = document.querySelectorAll(".user-name")
	const clientOpinions = document.querySelectorAll(".client-opinion")
	const userPics = document.querySelectorAll(".user-pic")
	const users = [
		{
			userName: "Marek",
			comment: "Najlepsze wakacje w moim życiu...",
			gender: "man",
			pic: "./dist/img/marek-pic.jpg",
		},
		{
			userName: "Jola",
			comment: "Na pewno tu jeszcze wrócimy!",
			gender: "woman",
			pic: "./dist/img/jola-pic.jpg",
		},
		{
			userName: "Anna",
			comment: "Wspaniały wypoczynek na łonie natury",
			gender: "woman",
			pic: "./dist/img/anna-pic.jpg",
		},
		{
			userName: "Henryk",
			comment: "Miła odmiana od zatłoczonych kurortów.",
			gender: "man",
			pic: "./dist/img/henryk-pic.jpg",
		},
		{
			userName: "Kamil",
			comment: "Przygoda życia!!!",
			gender: "man",
			pic: "./dist/img/kamil-pic.jpg",
		},
		{
			userName: "Edyta",
			comment: "Dzieciaki były zachwycone!!",
			gender: "woman",
			pic: "",
		},
	]

	userPics.forEach((userPic, index) => {
		userNames[index].textContent = users[index].userName
		clientOpinions[index].textContent = users[index].comment

		if (users[index].pic === "") {
			if (users[index].gender === "woman") {
				userPic.src = "./dist/img/user-woman-graphic.jpg"
			} else if (users[index].gender === "man") {
				userPic.src = "./dist/img/user-man-graphic.jpg"
			}
		} else {
			userPic.src = users[index].pic
		}
	})
}
addUserComments()

// mobile nav

const handleNav = () => {
	navMobile.classList.toggle("active")
	navMobileItems.forEach(item => {
		item.addEventListener("click", () => {
			navMobile.classList.remove("active")
		})
	})
}

navMobileItems.forEach(item => {
	item.addEventListener("click", e => {
		handleNav()
	})
})

// page transition delay on mobile nav

window.onload = () => {
	for (let i = 0; i < navMobileItems.length; i++) {
		const item = navMobileItems[i]

		item.addEventListener("click", e => {
			e.preventDefault()

			let target = e.currentTarget.href

			setTimeout(() => {
				window.location.href = target
			}, 300)
		})
	}
}

// form

const clearForm = e => {
	e.preventDefault()
	const inputs = [inputMail, inputName, inputPhone, textArea]
	inputs.forEach(input => {
		input.value = ""
	})

	const bugsText = [
		mailBugText,
		nameBugText,
		phoneBugText,
		messageBugText,
		checkboxBugText,
	]

	bugsText.forEach(bug => {
		bug.classList.remove("error-text")
	})

	checkbox.checked = false
}

const showError = (input, msg) => {
	const bugText = input.nextElementSibling
	bugText.classList.add("error-text")
	bugText.textContent = msg
}

const clearError = input => {
	const bugText = input.nextElementSibling
	bugText.classList.remove("error-text")
}

const checkLength = (input, num) => {
	const info = input.previousElementSibling.textContent.slice(0, -1)

	const userData = input.value.trim()

	if (userData.length === 0) {
		showError(input, `Musisz wprowadzić ${info.toLowerCase()}`)
	} else if (userData.length < num) {
		showError(input, `${info} składa się z conajmniej ${num} znaków.`)
	} else {
		clearError(input)
	}
}

const checkPhone = input => {
	const regex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/

	if (regex.test(input.value)) {
		clearError(inputPhone)
	} else {
		showError(inputPhone, `Numer telefonu jest niepoprawny`)
	}
}
const checkMail = input => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (regex.test(input.value)) {
		clearError(inputMail)
	} else {
		showError(inputMail, `Podany mail jest niepoprawny`)
	}
}

const checkCheckbox = () => {
	if (checkbox.checked === false) {
		checkboxBugText.textContent = "Zaakceptuj politykę prywatności"
		checkboxBugText.classList.add("error-text")
	} else {
		checkboxBugText.classList.remove("error-text")
	}
}

const checkAllForm = () => {
	let errors = 0
	const errorsText = document.querySelectorAll(".form__box-bug")
	errorsText.forEach(errorText => {
		if (errorText.classList.contains("error-text")) {
			errors++
		}
	})

	if (errors === 0) {
		popup.classList.add("active-popup")
	}
}

const sendForm = e => {
	e.preventDefault()
	checkLength(inputName, 3)
	checkLength(textArea, 10)
	checkPhone(inputPhone)
	checkMail(inputMail)
	checkCheckbox()
	checkAllForm()
}

const closePopup = e => {
	e.preventDefault()
	popupFormWarp.classList.add("close-wrapper")
	popup.classList.remove("active-popup")
	clearForm(e)
}

window.addEventListener("scroll", handleScrollSpy)
window.addEventListener("DOMContentLoaded", handleScrollSpy)
burgerBtn.addEventListener("click", handleNav)
navMobileCloseBtn.addEventListener("click", handleNav)
formButtonClear.addEventListener("click", clearForm)
formButtonSend.addEventListener("click", sendForm)
closePopupBtn.addEventListener("click", closePopup)
