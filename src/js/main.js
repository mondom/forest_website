const burgerBtn = document.querySelector(".header__top-burger-btn")
const navMobile = document.querySelector(".nav-mobile")
const navMobileCloseBtn = document.querySelector(".nav-mobile__btn-close")
const navDesktopLinks = document.querySelectorAll(".nav-desktop__item")
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

// scrollspy

const removeActiveClass = () => {
	navDesktopLinks.forEach(navLink => {
		navLink.classList.remove("active-nav-link")
	})
}

const updateActiveLink = () => {
	let newActiveSectionId = ""

	if (
		window.scrollY === 0 ||
		window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
	) {
		if (!window.location.pathname.endsWith("contact.html")) {
			removeActiveClass()
			activeSectionId = "" // Resetuj aktywną sekcję
		}
		return
	}

	document.querySelectorAll(".section").forEach(section => {
		const rect = section.getBoundingClientRect()
		const sectionTop = rect.top + window.scrollY
		const sectionBottom = sectionTop + rect.height

		let thresholdTop
		let thresholdBottom

		const footer = document.querySelector("footer")
		const footerHeight = footer ? footer.offsetHeight : 0

		if (section.id === "about-us") {
			thresholdTop = window.innerHeight / 3
			thresholdBottom = (window.innerHeight * 2) / 3
		} else if (section.id === "offer") {
			thresholdTop = window.innerHeight / 2
			thresholdBottom = window.innerHeight - footerHeight
		} else {
			thresholdTop = window.innerHeight / 2
			thresholdBottom = window.innerHeight
		}

		const isVisible =
			sectionTop <= window.scrollY + thresholdBottom &&
			sectionBottom >= window.scrollY + thresholdTop

		if (isVisible) {
			newActiveSectionId = section.id
		}
	})

	if (newActiveSectionId && newActiveSectionId !== activeSectionId) {
		removeActiveClass()

		const newActiveLink = document.querySelector(
			`.nav-desktop__item[href='index.html#${newActiveSectionId}']`
		)

		if (newActiveLink) {
			newActiveLink.classList.add("active-nav-link")
		}

		activeSectionId = newActiveSectionId
	}
}

// dynamic addition of user data to the comments section

const updateContactPageLink = () => {
	const isOnContactPage = window.location.pathname.endsWith("contact.html")

	if (isOnContactPage) {
		removeActiveClass()
		const contactLink = document.querySelector(
			`.nav-desktop__item[href='contact.html']`
		)

		if (contactLink) {
			contactLink.classList.add("active-nav-link")
		}
		activeSectionId = ""
	} else {
		updateActiveLink()
	}
}

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
		// forwardPage(e)
	})
})

// page transition

window.onload = () => {
	const transitionEl = document.querySelector(".transition")
	const linkItemsNav = document.querySelectorAll(".link-item-nav")
	setTimeout(() => {
		transitionEl.classList.remove("is-active")
	}, 300)

	for (let i = 0; i < linkItemsNav.length; i++) {
		const item = linkItemsNav[i]

		item.addEventListener("click", e => {
			e.preventDefault()

			let target = e.currentTarget.href

			transitionEl.classList.add("is-active")

			setTimeout(() => {
				window.location.href = target
			}, 300)
		})
	}
}

// const forwardPage = e => {
// 	e.preventDefault()
// 	const href = e.target.getAttribute("href")

// 	if (href === "index.html") {
// 		window.location.href = href
// 		window.scrollTo({ top: 0, behavior: "smooth" })
// 	} else if (href.startsWith("index.html#")) {
// 		const sectionId = href.split("#")[1]
// 		const targetSection = document.getElementById(sectionId)
// 		if (targetSection) {
// 			targetSection.scrollIntoView({ behavior: "smooth" })
// 		}
// 	} else if (href === "contact.html") {
// 		window.location.href = href
// 	}
// }

// form

const clearForm = e => {
	e.preventDefault()
	const inputs = [inputMail, inputName, inputPhone, textArea]
	inputs.forEach(input => {
		input.value = ""
	})

	checkbox.checked = false
}

window.addEventListener("scroll", updateActiveLink)
window.addEventListener("load", updateContactPageLink)
burgerBtn.addEventListener("click", handleNav)
navMobileCloseBtn.addEventListener("click", handleNav)
formButtonClear.addEventListener("click", clearForm)
