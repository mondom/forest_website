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

// scrollspy

const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = []

		scrollSpySections.forEach(section => {
			// console.log(window.scrollY)
			// // wartość scrolla
			// console.log(section.offsetTop)
			// // odległość danej sekcji od górnej krawędzi przeglądarki
			// console.log(section.offsetHeight);
			// // wysokość każdej sekcji

			if (window.scrollY <= section.offsetTop + section.offsetHeight) {
				sections.push(section)

				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				)

				navDesktopLinks.forEach(link => {
					link.classList.remove("active-nav-link")
				})

				
				activeSection.classList.add("active-nav-link")
			}
		})
	}
}
console.log(navDesktopLinks)

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

	checkbox.checked = false
}

window.addEventListener("scroll", handleScrollSpy)
burgerBtn.addEventListener("click", handleNav)
navMobileCloseBtn.addEventListener("click", handleNav)
// formButtonClear.addEventListener("click", clearForm)
