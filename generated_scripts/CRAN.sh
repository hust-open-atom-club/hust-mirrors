# Auto-generated script for CRAN
# Generated from: CRAN.md
# Mirror ID: cran

check() {
	if [ -f ~/.Rprofile ]; then
	return 0
else
	return 1
fi
}

_cran_install_1() {
	# 替换R配置文件
	if [ -f ~/.Rprofile ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/cran_first___.Rprofile.bak ] || cp ~/.Rprofile ${_backup_dir}/cran_first___.Rprofile.bak || {
			print_error "Backup ~/.Rprofile failed"
			return 1
		}
		 sed -i -E -e "$a options("repos" = c(CRAN="http://${_domain}/CRAN/"))" ~/.Rprofile || {
			print_error "Failed to update ~/.Rprofile"
			return 1
		}
	else
		print_warning "File ~/.Rprofile does not exist"
	fi

	return 0
}

install() {

	_cran_install_1 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/cran_first___.Rprofile.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/cran_first___.Rprofile.bak" ~/.Rprofile 2>/dev/null || true
		print_info "Restored ~/.Rprofile"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/cran_1_1.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f ~/.Rprofile ] && grep -q "$domain" ~/.Rprofile 2>/dev/null && return 0
	return 1
}
