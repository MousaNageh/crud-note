from datetime import datetime 

class ErrorLogger:
    def write_error_to_file(self,merrage):
        with open("error.log",'a') as writer:
            writer.write(f"{merrage} ---- at time : {datetime.now()} \n")
            writer.flush()