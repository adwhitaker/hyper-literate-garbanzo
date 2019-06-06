console.log('hello')

let state = {
    boxes: [],
}

const app = document.getElementById('app')

document.addEventListener('DOMContentLoaded', onLoaded, false)

function onLoaded() {
    for (let i = 1; i < 5; i++) {
        addBox(i)
    }

    console.log('state', state.boxes)

}

function addBox(id) {
    let div = document.createElement('div')
    div.classList.add('box')
    div.style.top = (id * 100) + 'px'

    app.appendChild(div)

    let data = {
        id,
        moving: false,
        element: div,
    }

    div.addEventListener('mousedown', (event) => {
        drag(event, data)
    })

    div.addEventListener('mouseup', (event) => {
        data.moving = false
    })

    div.addEventListener('mousemove', (event) => {
        if (data.moving) {
            move(event, data)
        }
    })

    state.boxes.push(data)

}

const drag = (event, data) => {
    console.log('event', event)
    data.moving = true

    data.width = event.offsetX
    data.height = event.offsetY
}

const move = (event, data) => {
    const x = event.clientX - data.width
    const y = event.clientY - data.height

    data.element.style.top = y + 'px'
    data.element.style.left = x + 'px'

    state.boxes.forEach(box => {
        if (box.id === data.id) {
            return
        }
        const top = box.element.style.top ? Number(box.element.style.top.substring(0, box.element.style.top.length - 2)) : 0
        const left = box.element.style.left ? Number(box.element.style.left.substring(0, box.element.style.left.length - 2)) : 0

        if (top - y < 100 && left - x < 100) {
            data.element.style.backgroundColor = 'green'

            // west
            if (x < data.x && y === data.y) {
                console.log('west', left)
                box.element.style.left = (left - 5) + 'px'
            }

            // east
            if (x > data.x && y === data.y) {
                console.log('east')
                box.element.style.left = (left + 5) + 'px'
            }

            // south
            if (x === data.x && y > data.y) {
                console.log('south')
                box.element.style.top = (top + 5) + 'px'
            }

            // north
            if (x === data.x && y < data.y) {
                console.log('north')
                box.element.style.top = (top - 5) + 'px'

            }
        }

    })

    data.x = x
    data.y = y

}