import cv2
import numpy as np


video = cv2.VideoCapture("/mnt/c/Users/wen-hai liu/Downloads/CARA_gifs/final_final/medicine_share.mp4")
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('/mnt/c/Users/wen-hai liu/Downloads/CARA_gifs/final_final/medicine_share_rmv.mp4', fourcc, 24.03, (int(video.get(3)), int(video.get(4))))
ret, frame = video.read()
target_color = np.array([250, 245, 246])
replacement_color = np.array([255, 255, 255])
mask = cv2.inRange(frame, target_color, target_color)

while True:
    ret, frame = video.read()
    if not ret:
        break
    frame[mask != 0] = replacement_color
    out.write(frame)
video.release()
out.release()
