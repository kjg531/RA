bind = "0.0.0.0:32181"

workers = 2

max_requests = 1000
timeout = 30
keep_alive = 2

preload = True

accesslog = '../logs/access.log'
errorlog = '../logs/error.log'