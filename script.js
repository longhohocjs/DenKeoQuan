document.addEventListener('DOMContentLoaded', () => {
    const cube = document.getElementById('cube');
    const faces = document.querySelectorAll('.face');
    const statusText = document.getElementById('status-text');

    // --- Hàm điều khiển trạng thái quay ---

    // Hàm dừng quay (Pause)
    const pauseRotation = () => {
        cube.style.animationPlayState = 'paused';
        cube.classList.remove('is-spinning');
        statusText.textContent = 'Đã dừng (Rê chuột ra để quay tiếp)';
        
        // Lưu trạng thái transform hiện tại để khi quay lại không bị giật
        const currentTransform = window.getComputedStyle(cube).getPropertyValue('transform');
        if (currentTransform) {
            cube.style.transform = currentTransform;
        }
    };

    // Hàm tiếp tục quay (Resume)
    const resumeRotation = () => {
        // Đảm bảo không ghi đè transform đã lưu
        if (!cube.classList.contains('is-spinning')) {
            cube.style.transform = ''; // Xóa transform đã lưu
            cube.classList.add('is-spinning');
        }
        cube.style.animationPlayState = 'running';
        statusText.textContent = 'Đang quay...';
    };


    // --- Gán sự kiện cho các mặt (Faces) và khối chính (Cube) ---

    // 1. Dùng sự kiện `mouseover` trên khối `cube` để dừng (Dễ dàng hơn cho việc xử lý)
    // Lưu ý: Dùng `mouseover` và `mouseout` trên khối cha `#cube` để bắt sự kiện hover vào bất kỳ mặt nào
    
    cube.addEventListener('mouseover', pauseRotation);
    cube.addEventListener('mouseout', resumeRotation);


    // 2. Thêm hỗ trợ cho thiết bị cảm ứng (Touch)
    // Sử dụng touchstart để dừng và touchend để quay tiếp
    faces.forEach(face => {
        face.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            pauseRotation();
        });

        face.addEventListener('touchend', (e) => {
            e.preventDefault();
            // Thêm độ trễ nhỏ để tránh nhầm lẫn với sự kiện click
            setTimeout(resumeRotation, 200);
        });
    });
    
    // Khởi tạo trạng thái quay ban đầu
    resumeRotation();
});