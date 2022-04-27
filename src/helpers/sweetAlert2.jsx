import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const toastSW = (icon, message) => {
    Toast.fire({
        icon: icon,
        title: message
    });
}

export const confirmModal = (icon, title, text, buttonText) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: '#084f93',
        cancelButtonColor: '#d33',
        confirmButtonText: buttonText
    });
}
