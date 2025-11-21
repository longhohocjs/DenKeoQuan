 /* ==================================== */
        /* BẮT ĐẦU PHẦN JAVASCRIPT (TƯƠNG ĐƯƠNG script.js) */
        /* Không cần thay đổi JS, vì lỗi là do CSS transform. */
        /* ==================================== */
        document.addEventListener('DOMContentLoaded', () => {
            const cube = document.getElementById('cube');
            const faces = document.querySelectorAll('.face');
            const statusText = document.getElementById('status-text');

            // --- Hàm điều khiển trạng thái quay ---

            // Hàm dừng quay (Pause)
            const pauseRotation = () => {
                if (cube.style.animationPlayState === 'paused') return;

                cube.style.animationPlayState = 'paused';
                
                statusText.textContent = '* Đã dừng';
                statusText.classList.remove('text-green-400');
                statusText.classList.add('text-red-400');
            };

            // Hàm tiếp tục quay (Resume)
            const resumeRotation = () => {
                cube.style.animationPlayState = 'running';
                
                statusText.textContent = '* Đang quay...';
                statusText.classList.remove('text-red-400');
                statusText.classList.add('text-green-400');
            };


            // --- Gán sự kiện cho từng mặt (Face) ---
            
            let isPausedByTouch = false;

            faces.forEach(face => {
                // 1. Mouse Events (Dừng khi rê chuột vào mặt này, quay khi rê chuột ra)
                face.addEventListener('mouseover', pauseRotation);
                face.addEventListener('mouseout', resumeRotation);

                // 2. Touch Events (Dừng khi chạm, quay khi nhấc tay)
                face.addEventListener('touchstart', (e) => {
                    e.preventDefault(); 
                    if (!isPausedByTouch) {
                        pauseRotation();
                        isPausedByTouch = true;
                    }
                });

                face.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    if (isPausedByTouch) {
                        resumeRotation();
                        isPausedByTouch = false;
                    }
                });
            });
            
            // Khởi tạo playState rõ ràng
            cube.style.animationPlayState = 'running';
        });
        /* ==================================== */
        /* KẾT THÚC PHẦN JAVASCRIPT */
        /* ==================================== */